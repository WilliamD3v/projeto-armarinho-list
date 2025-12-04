import axios from "@/lib/axios";

export const getProduct = async () => {
  try {
    const res = await axios.get(`product/get/product`);
    return res.data;
  } catch (error) {
    console.error("Error no servidor:", error);
  }
};

export const getGastos = async () => {
  try {
    const res = await axios.get(`gastos/get-gastos`);
    return res.data;
  } catch (error) {
    console.error("Error no servidor:", error);
  }
};

export const getBills = async () => {
  try {
    const res = await axios.get(`bills/get-bills`);
    return res.data;
  } catch (error) {
    console.error("Error no servidor:", error);
  }
};
