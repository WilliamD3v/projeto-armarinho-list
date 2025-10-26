"use client";
import { useEffect, useState } from "react";
import {
  SidebarContainer,
  SidebarTop,
  SidebarCenter,
  Button,
  SidebarBottom,
  Divider,
  LogoutButton,
  ActionButtons,
  DeleteButton,
  MainContainer,
  ProductInfo,
  ProductItem,
  ProductsList,
  UpdateButton,
  CloseButton,
  DrawerContent,
  DrawerOverlay,
  EnterpriseColumn,
  EnterpriseGrid,
  EnterpriseHeader,
  EnterpriseProductInfo,
  EnterpriseProductItem,
  EnterpriseProducts,
} from "./styles";
import { destroyCookie } from "nookies";
import { usePathname, useRouter } from "next/navigation";
import { FormProduct } from "@/components/FormProduct";
import {
  CloseButtonForm,
  PageContainer,
} from "@/components/FormProduct/styles";
import { useQuery } from "@tanstack/react-query";
import { getGastos, getProduct } from "@/hooks/useClient";
import { ProductProp } from "@/types/product";
import axios from "@/lib/axios";
import { FormGastos } from "@/components/FromGastos";
import { GastosProps } from "@/types/gastos";
import { TabelaGastos } from "@/components/TabelaGastos";

export default function DashboardPage() {
  const router = useRouter();

  const { data: dataProduct, refetch: refetchProduct } = useQuery<
    ProductProp[]
  >({
    queryKey: ["Product"],
    queryFn: getProduct,
  });

  const { data: dataGastos, refetch: refetchGastos } = useQuery<GastosProps[]>({
    queryKey: ["Gastos"],
    queryFn: getGastos,
  });

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductProp | null>(
    null
  );
  const [productToEdit, setProductToEdit] = useState<ProductProp | null>(null);
  const [isVisible, setIsVisibles] = useState(false);
  const [isVisibleTabelaGastos, setIsVisibleTabelaGastos] = useState(false);
  const [gastoToEdit, setGastoToEdit] = useState<GastosProps | null>(null);

  const handleDeleteProduct = async (productId: string) => {
    setLoadingId(productId);

    try {
      const res = await axios.delete(`/product/delete/product/${productId}`);

      setSelectedProduct(null);

      if (res.status === 200) {
        console.log("Produto deletado com sucesso!");
      }

      await refetchProduct();
    } catch (error) {
      console.log("Erro ao deletar produto!");
    } finally {
      setLoadingId(null);
    }
  };

  const handleLogout = () => {
    destroyCookie(null, "nextauth.token");
    destroyCookie(null, "nextauth.userId");
    router.push("/auth");
  };

  const productsByEnterprise = dataProduct?.reduce((acc, product) => {
    if (!product.enterprise) return acc;
    if (!acc[product.enterprise]) {
      acc[product.enterprise] = [];
    }
    acc[product.enterprise].push(product);
    return acc;
  }, {} as Record<string, ProductProp[]>);

  return (
    <>
      <SidebarContainer>
        <SidebarTop>Armarinho Simões</SidebarTop>
        <SidebarCenter>
          <Button
            onClick={() => {
              setSelectedProduct(null);
              setIsVisibles(true);
            }}
          >
            Adicionar Produto
          </Button>
          <Button onClick={() => setIsVisibleTabelaGastos(true)}>
            Tabela de Gastos
          </Button>
        </SidebarCenter>
        <SidebarBottom>
          <Divider />
          <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
        </SidebarBottom>
      </SidebarContainer>

      {isVisible && (
        <PageContainer>
          <FormProduct
            refetchProduct={refetchProduct}
            setProductToEdit={setProductToEdit}
            closeForm={() => {
              setIsVisibles(false);
              setSelectedProduct(null);
            }}
            initialData={productToEdit}
          />
        </PageContainer>
      )}

      <MainContainer>
        <h1>Produtos por Empresa</h1>

        <EnterpriseGrid>
          {productsByEnterprise &&
            Object.entries(productsByEnterprise).map(
              ([enterprise, products]) => {
                const total = products.reduce((acc, product) => {
                  const num = parseFloat(
                    String(product.value)
                      .replace("R$", "")
                      .replace(",", ".")
                      .trim()
                  );
                  return acc + (isNaN(num) ? 0 : num);
                }, 0);

                return (
                  <EnterpriseColumn key={enterprise}>
                    <EnterpriseHeader>{enterprise}</EnterpriseHeader>
                    <EnterpriseProducts>
                      {products.map((product) => (
                        <EnterpriseProductItem
                          key={product._id}
                          onClick={() => setSelectedProduct(product)}
                        >
                          <EnterpriseProductInfo>
                            <span>{product.name}</span>
                            <small>R$ {product.value}</small>
                          </EnterpriseProductInfo>
                          <ActionButtons>
                            <UpdateButton
                              onClick={(e) => {
                                e.stopPropagation();
                                setProductToEdit(product);
                                setIsVisibles(true);
                              }}
                            >
                              Atualizar
                            </UpdateButton>
                            <DeleteButton
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteProduct(product._id);
                              }}
                              disabled={loadingId === product._id}
                            >
                              {loadingId === product._id
                                ? "Deletando..."
                                : "Apagar"}
                            </DeleteButton>
                          </ActionButtons>
                        </EnterpriseProductItem>
                      ))}

                      {/* 🔹 Linha do TOTAL */}
                      <EnterpriseProductItem style={{ background: "#f1f5f9" }}>
                        <EnterpriseProductInfo>
                          <span>Total</span>
                        </EnterpriseProductInfo>
                        <strong style={{ color: "#111827" }}>
                          R$ {total.toFixed(2).replace(".", ",")}
                        </strong>
                      </EnterpriseProductItem>
                    </EnterpriseProducts>
                  </EnterpriseColumn>
                );
              }
            )}
        </EnterpriseGrid>
      </MainContainer>

      {/* Aba flutuante */}
      {selectedProduct && (
        <DrawerOverlay>
          <DrawerContent>
            <CloseButton onClick={() => setSelectedProduct(null)}>
              ×
            </CloseButton>
            <h2>{selectedProduct.name}</h2>
            <p>
              <strong>Preço:</strong> {selectedProduct.value}
            </p>
            <p>
              <strong>Descrição:</strong> {selectedProduct.description}
            </p>
            <p>
              <strong>Estoque:</strong> {selectedProduct.qnt}
            </p>
            <p>
              <strong>Categoria:</strong> {selectedProduct.cod}
            </p>
          </DrawerContent>
        </DrawerOverlay>
      )}

      {isVisibleTabelaGastos && (
        <TabelaGastos
          dataGastos={dataGastos}
          closeTable={() => setIsVisibleTabelaGastos(false)}
          refetchGastos={refetchGastos}
          onEdit={(gasto) => {
            setGastoToEdit(gasto);
            setIsVisibleTabelaGastos(false);
          }}
        />
      )}
    </>
  );
}
