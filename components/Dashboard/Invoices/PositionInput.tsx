import React from 'react'

function PositionInput() {
  return (
    <div className="col-span-full sm:col-span-6 sm:grid sm:grid-cols-10 sm:gap-4" key={index}>
      <div className="col-span-full sm:col-span-7">
        <label htmlFor="invoice_position_name">Position</label>
        <input
          type="text"
          placeholder="Name"
          name="invoice_position_name[]"
          autoComplete="off"
          className="h-10 w-full p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-900 dark:text-white" />
      </div>
      <div className="col-span-full sm:col-span-2">
        <label htmlFor="invoice_position_price">Price</label>
        <CurrencyInput
          currency={currency}
          placeholder="Price"
          name="invoice_position_price[]"
          autoComplete="off"
          startValue={positionPrice}
          setValue={setPositionPrice}
        />
      </div>
      <div className="col-span-full sm:col-span-1">
        <label htmlFor="invoice_position_price">Amount</label>
        <input
          type="number"
          placeholder="Amount"
          name="invoice_position_amount[]"
          value="1"
          className="h-10 w-full p-2 mb-4 border border-gray-200 rounded focus:outline outline-1 outline-primary-500 dark:outline-secondary-500 dark:bg-neutral-600 dark:border-neutral-900 dark:text-white" />
      </div>
    </div>
  )
}

export default PositionInput