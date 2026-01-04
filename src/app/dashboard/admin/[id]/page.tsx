"use client";
import axios from "@/lib/axios";
import { useState } from "react";
import { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getBills, getGastos, getProduct } from "@/hooks/useClient";

import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineMenuFold } from "react-icons/ai";

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
  EnterpriseTotal,
  BoxMenu,
  ButtonMenu,
} from "./styles";

import { ProductProps } from "@/types/product";
import { GastosProps } from "@/types/gastos";
import { BillsProps } from "@/types/bills";

import { PageContainer } from "@/components/FormProduct/styles";
import { TabelaGastos } from "@/components/TabelaGastos";
import { FormProduct } from "@/components/FormProduct";
import { FormBills } from "@/components/FromBills";

export default function DashboardPage() {
  const router = useRouter();

  const { data: dataProduct, refetch: refetchProduct } = useQuery<
    ProductProps[]
  >({
    queryKey: ["Product"],
    queryFn: getProduct,
  });

  const { data: dataGastos, refetch: refetchGastos } = useQuery<GastosProps[]>({
    queryKey: ["Gastos"],
    queryFn: getGastos,
  });

  const { data: dataBills, refetch: refetchBills } = useQuery<BillsProps[]>({
    queryKey: ["Bills"],
    queryFn: getBills,
  });

  console.log(dataBills);

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(
    null
  );
  const [productToEdit, setProductToEdit] = useState<ProductProps | null>(null);
  const [isVisible, setIsVisibles] = useState(false);
  const [isVisibleTabelaGastos, setIsVisibleTabelaGastos] = useState(false);
  const [isVisibleTabelaBills, setIsVisibleTabelaBills] = useState(false);
  const [gastoToEdit, setGastoToEdit] = useState<GastosProps | null>(null);
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

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
  }, {} as Record<string, ProductProps[]>);

  return (
    <>
      <SidebarContainer menu={menu}>
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
          <Button onClick={() => setIsVisibleTabelaBills(true)}>
            Tabela de Boletos
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
        <BoxMenu menu={menu}>
          <ButtonMenu onClick={handleMenu}>
            {menu ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
          </ButtonMenu>
        </BoxMenu>

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
                    {/* 🔒 Header fixo */}
                    <EnterpriseHeader>{enterprise}</EnterpriseHeader>

                    {/* 🔄 Área com rolagem */}
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
                    </EnterpriseProducts>

                    {/* 🔒 Total fixo */}
                    <EnterpriseTotal>
                      <span>Total</span>
                      <strong>R$ {total.toFixed(2).replace(".", ",")}</strong>
                    </EnterpriseTotal>
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

      {isVisibleTabelaBills && (
        <FormBills
          billsData={dataBills ?? []}
          refetchBills={refetchBills}
          setIsVisibleTabelaBills={setIsVisibleTabelaBills}
        />
      )}
    </>
  );
}
