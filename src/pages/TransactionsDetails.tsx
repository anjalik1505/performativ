import { useEffect, useCallback, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useFetchApi from "../hooks/useFetchApi";
import { Transaction, Status, TransactionType } from "../components/transactions/transaction.types";

const Transactions = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: transaction, fetchData } = useFetchApi<Transaction>();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Transaction>({
    id: "",
    portfolio_id: 0,
    instrument_id: 0,
    status: Status.Settled,
    comments: "",
    quantity: 0,
    price: 0,
    transaction_costs: 0,
    trade_date: new Date(),
    fx_rate: "0",
    price_uses_market_data: 0,
    settlement_date: new Date(),
    transaction_type: TransactionType.Buy,
    sale_method: "",
    portfolio: "",
    total_amount: 0,
  });

  const fetchTransaction = useCallback(async () => {
    console.log("Fetching transaction for ID:", params.id);
    await fetchData(`/transaction/${params.id}`);
  }, [params.id]);

  useEffect(() => {
    console.log("useEffect: fetchTransaction triggered");
    fetchTransaction();
  }, [fetchTransaction]);

  useEffect(() => {
    if (transaction) {
      console.log("Transaction data loaded:", transaction);
      setFormData(transaction);
    }
  }, [transaction]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const numericFields = ["quantity", "price", "total_amount", "transaction_costs", "price_uses_market_data"];
    const updatedValue = numericFields.includes(name)
      ? parseFloat(value)
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Transaction:", formData);
    setEditMode(false);
  };

  useEffect(() => {
    if (location.state?.editMode) {
      setEditMode(true);
    }
  }, [location.state]);

  if (!transaction) {
    return (
      <p className="text-red-500 text-center mt-10">Loading transaction...</p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg relative text-left mt-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        Transaction Details
      </h2>
      {editMode ? (
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-2 gap-4">
          <FormInput
            label="Transaction ID"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            disabled
          />
          <FormInput
            label="Portfolio"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleInputChange}
          />
          <FormInput
            label="Instrument ID"
            name="instrument_id"
            value={formData.instrument_id}
            onChange={handleInputChange}
          />
          <FormInput
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          />
          <FormInput
            label="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
          />
          <FormInput
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
          <FormInput
            label="Total Amount"
            name="total_amount"
            value={formData.total_amount}
            onChange={handleInputChange}
          />
          <FormInput
            label="Trade Date"
            name="trade_date"
            value={formData.trade_date}
            onChange={handleInputChange}
          />
          <FormInput
            label="Settlement Date"
            name="settlement_date"
            value={formData.settlement_date}
            onChange={handleInputChange}
          />
          <FormInput
            label="Transaction Type"
            name="transaction_type"
            value={formData.transaction_type}
            onChange={handleInputChange}
          />
          <FormInput
            label="FX Rate"
            name="fx_rate"
            value={formData.fx_rate}
            onChange={handleInputChange}
          />
          <div className="col-span-2 flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="p-6 grid grid-cols-2 gap-4">
            <DetailItem label="Transaction ID" value={transaction.id} />
            <DetailItem label="Portfolio" value={transaction.portfolio} />
            <DetailItem
              label="Instrument ID"
              value={transaction.instrument_id}
            />
            <DetailItem
              label="Status"
              value={transaction.status}
              status={true}
            />
            <DetailItem label="Quantity" value={transaction.quantity} />
            <DetailItem
              label="Price"
              value={`$${transaction.price.toLocaleString()}`}
            />
            <DetailItem
              label="Total Amount"
              value={`$${transaction.total_amount.toLocaleString()}`}
            />
            <DetailItem label="Trade Date" value={transaction.trade_date} />
            <DetailItem
              label="Settlement Date"
              value={transaction.settlement_date}
            />
            <DetailItem
              label="Transaction Type"
              value={transaction.transaction_type}
            />
            <DetailItem label="FX Rate" value={transaction.fx_rate} />
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => navigate("/transactions")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              ← Back to Transactions
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const FormInput = ({ label, name, value, onChange, disabled = false }) => (
  <div>
    <label className="text-sm text-gray-500">{label}</label>
    <input
      type="text"
      name={name}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      className="w-full p-2 border border-gray-300 rounded mt-1"
    />
  </div>
);

const DetailItem = ({ label, value, status = false }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p
      className={`text-lg ${
        status
          ? value === Status.Settled
            ? "text-green-600"
            : "text-yellow-600"
          : "text-gray-900"
      }`}
    >
      {value}
    </p>
  </div>
);

export default Transactions;
