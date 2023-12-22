import styles from "./PaymentReceipt.module.css";
import jsPDF from "jspdf";

const PaymentReceipt = ({
  open,
  onClose,
  selectSales,
  setOpenModal,
  items,
}) => {
  const handleDownload = () => {
    const pdf = new jsPDF();

    if (selectSales) {
      pdf.text(20, 20, `Nome: ${selectSales.name}`);
      pdf.text(20, 30, `CPF: ${selectSales.cpf}`);
      pdf.text(20, 40, `E-mail: ${selectSales.email}`);

      pdf.text(20, 80, `Valor Recebido: ${selectSales.value}`);
      pdf.text(20, 90, `Valor Venda: ${selectSales.value}`);
      pdf.text(20, 100, `Troco Devido: ${selectSales.moneyChange}`);
    }

    pdf.save("comprovante.pdf");
  };
  const closePopUp = () => {
    setOpenModal(false);
  };

  if (!open) return null;
  console.log(selectSales);

  const formatCurrency = (value) => {
    return (value / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div onClick={onClose} className={styles.overlay}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.modalContainer}
      >
        <div className={styles.allContainer}>
          {selectSales && (
            <div className={styles.content}>
              <div className={styles.contentDetails}>
                <div className={styles.divName}>
                  <label className={styles.lblName}>Nome</label>
                  <p>{selectSales.name}</p>
                </div>

                <div className={styles.divCpf}>
                  <label className={styles.lblCpf}>CPF</label>
                  <p>{selectSales.cpf}</p>
                </div>
              </div>
              <div className={styles.divEmail}>
                <label className={styles.email}>E-mail</label>
                <p>{selectSales.email}</p>
              </div>
              <div className={styles.minhaLinha}></div>
              <div className={styles.contenItems}>
                <div className={styles.contentDetailsItems}>
                  <div className={styles.containerItemsId}>
                    <label className={styles.lblItem}>Itm</label>
                    {items.map((item) => (
                      <p>{item.id}1</p>
                    ))}
                  </div>
                  <div className={styles.containerDescription}>
                    <label className={styles.lblDescription}>Descrição</label>
                    {items.map((item) => (
                      <p>{item.description}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.minhaLinha}></div>
              <div className={styles.contentValues}>
                <div className={styles.valueR}>
                  <p>Valor recebido</p>
                  <p>
                    {formatCurrency(
                      selectSales.value + selectSales.moneyChange
                    )}
                  </p>
                </div>
                <div className={styles.value}>
                  <p>Valor venda</p>
                  <p>{formatCurrency(selectSales.value)}</p>
                </div>
                <div className={formatCurrency(styles.moneyChange)}>
                  <p>Troco devido</p>
                  <p>{formatCurrency(selectSales.moneyChange)}</p>
                </div>
              </div>
            </div>
          )}

          <div className={styles.btnContainer}>
            <button className={styles.btnPrimary} onClick={handleDownload}>
              SALVAR
            </button>
            <button className={styles.btnPrimary} onClick={window.print}>
              IMPRIMIR
            </button>
            <button className={styles.btnOutline} onClick={closePopUp}>
              FECHAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;
