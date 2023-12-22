// useSales.js
import { useState, useEffect } from "react";

const useListSales = () => {
  const [selectSales, setSelcetSales] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [sales, setSales] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/home/sales", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao listar a venda");
        }

        const data = await response.json();
        setSales(data.sales);
        setItems(data.items);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao listar a(s) venda(s): " + error.message);
        setLoading(false);
      }
    };

    fetchData();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    selectSales,
    setSelcetSales,
    openModal,
    setOpenModal,
    sales,
    items,
    loading,
    windowWidth,
  };
};

export default useListSales;
