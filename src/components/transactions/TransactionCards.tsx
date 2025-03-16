import React from "react";
import { TransactionResponse } from "./transaction.types";

const TransactionGrid: React.FC<TransactionResponse> = ({ transactions }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {transactions &&
        transactions.length > 0 &&
        transactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">
              {index}: Transaction #{transaction.id.slice(0, 6)}
            </h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Portfolio Id:</span>{" "}
                {transaction.portfolio_id}
              </p>
              <p>
                <span className="font-medium">Portfolio:</span>{" "}
                {transaction.portfolio}
              </p>

              <p>
                <span className="font-medium">Id:</span> {transaction.id}
              </p>
              <p>
                <span className="font-medium">Instrument ID:</span>{" "}
                {transaction.instrument_id}
              </p>
              <p>
                <span className="font-medium">Quantity:</span>{" "}
                {transaction.quantity}
              </p>
              <p>
                <span className="font-medium">Price:</span> $
                {transaction.price.toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Total Amount:</span> $
                {transaction.total_amount.toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    transaction.status === "SETTLED"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {transaction.status}
                </span>
              </p>
              <p>
                <span className="font-medium">Trade Date:</span>{" "}
                {String(transaction.trade_date)}
              </p>
              <p>
                <span className="font-medium">Settlement Date:</span>{" "}
                {String(transaction.settlement_date)}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TransactionGrid;
