import { useEffect, useCallback } from "react";
import useFetchApi from "../hooks/useFetchApi";
import TransactionGrid from "../components/transactions/TransactionGrid";
import { TransactionResponse } from "../components/transactions/transaction.types";

const Transactions = () => {
  const { data, loading, error, fetchData } =
    useFetchApi<TransactionResponse>();

  const fetchTransactions = useCallback(async () => {
    const paramsdata = {
      limit: 100,
      last_evaluated_key: "",
    };
    await fetchData("/transactions", {
      params: paramsdata,
    });
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-gray-200 rounded-lg p-6 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-lg text-red-600 mb-4">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data || data.transactions.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <img
          src="/empty-state.svg"
          alt="No transactions"
          className="w-32 h-32 mb-4"
        />
        <p className="text-lg text-gray-600">No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <TransactionGrid transactions={data.transactions} />
    </div>
  );
};

export default Transactions;
