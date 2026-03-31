import React, { useState } from 'react';
import { Wallet, PlusCircle, TrendingDown, ArrowUpCircle } from 'lucide-react';

const SummaryCards = ({ expenses, onAddMoney }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [amountInput, setAmountInput] = useState('');
    const [titleInput, setTitleInput] = useState('');

    const handleAddMoneySubmit = (e) => {
        e.preventDefault();
        const amount = Number(amountInput);
        if (amount > 0 && titleInput.trim()) {
            onAddMoney({
                title: titleInput.trim(),
                amount: amount,
                date: new Date().toISOString().split('T')[0],
                type: 'added_money'
            });
            setAmountInput('');
            setTitleInput('');
            setIsAdding(false);
        }
    };

    // Calculate dynamically from the database using type tag
    const addedMoney = expenses
        .filter(e => e.type === 'added_money')
        .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const totalExpenses = expenses
        .filter(e => e.type === 'expense' || !e.type)
        .reduce((acc, curr) => acc + Number(curr.amount), 0);
    
    const currentBalance = addedMoney - totalExpenses;

    return (
        <div className="space-y-6">
            {/* Header and Add Money Interaction */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">My Funds</h2>
                
                {isAdding ? (
                    <form onSubmit={handleAddMoneySubmit} className="flex flex-col sm:flex-row items-center gap-2">
                        <input
                            type="text"
                            value={titleInput}
                            onChange={(e) => setTitleInput(e.target.value)}
                            placeholder="Source (e.g. Parents)"
                            className="w-full sm:w-48 px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                            required
                        />
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <input
                                type="number"
                                value={amountInput}
                                onChange={(e) => setAmountInput(e.target.value)}
                                placeholder="Amount (₹)"
                                className="w-full sm:w-32 px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                                required
                                min="1"
                            />
                            <button 
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium shadow-sm transition-colors"
                            >
                                Save
                            </button>
                            <button 
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl font-medium transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <button 
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 bg-green-50 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/50 px-4 py-2 rounded-xl font-medium shadow-sm transition-colors"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Add Money
                    </button>
                )}
            </div>

            {/* Summary Cards with Soft Colors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Added Money Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between hover:shadow-md transition-shadow duration-300">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Added Money</p>
                        <h3 className="text-3xl font-bold text-green-500 dark:text-green-400">
                            ₹{addedMoney.toLocaleString()}
                        </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                        <ArrowUpCircle className="w-6 h-6 text-green-500 dark:text-green-400" />
                    </div>
                </div>

                {/* Current Balance Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between hover:shadow-md transition-shadow duration-300">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Current Balance</p>
                        <h3 className={`text-3xl font-bold ${currentBalance >= 0 ? 'text-blue-500 dark:text-blue-400' : 'text-red-400 dark:text-red-400'}`}>
                            ₹{currentBalance.toLocaleString()}
                        </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                    </div>
                </div>

                {/* Total Expenses Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between hover:shadow-md transition-shadow duration-300">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Expenses</p>
                        <h3 className="text-3xl font-bold text-red-500 dark:text-red-400">
                            ₹{totalExpenses.toLocaleString()}
                        </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center">
                        <TrendingDown className="w-6 h-6 text-red-500 dark:text-red-400" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummaryCards;
