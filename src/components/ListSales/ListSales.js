import styles from "./ListSales.module.css";
import receipt from "../../assets/icons/receipt_black_24dp.svg";

export default function ListSales({
  sales,
  setSelectSales,
  setOpenModal,
  items,
}) {
  const formatCurrency = (value) => {
    return (value / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  return (
    <tr key={sales.id} className={styles.containerUserInfo}>
      <td className={styles.id}>{sales.id}</td>
      <td className={styles.name}>{sales.name}</td>
      <td className={styles.cpf}>{sales.cpf}</td>
      <td className={styles.email}>{sales.email}</td>
      <td className={styles.qtdItens}>
        {items.length >= 10 ? items.length : "0" + items.length}
      </td>
      <td className={styles.value}>{formatCurrency(sales.value)}</td>
      <td className={styles.moneyChange}>
        {formatCurrency(sales.moneyChange)}
      </td>
      <td className={styles.receipt}>
        <button
          className={styles.receipt}
          onClick={() => {
            setOpenModal(true);
            setSelectSales(sales);
          }}
        >
          <img src={receipt} alt="receipt" />
        </button>
      </td>
    </tr>
  );
}
