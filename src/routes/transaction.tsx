import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import Inputs from "@/components/transaction/inputs";
import Outputs from "@/components/transaction/outputs";
import Button from "@/components/ui/core/button";
import Icon from "@/components/ui/core/icon";
import FieldList from "@/components/ui/shared/field-list";
import useTransaction from "@/hooks/useTransaction";
import cn from "@/utils/class-names";

export const Route = createFileRoute("/transaction")({
	head: () => ({
		meta: [
			{
				title: "transaction | praxe",
			},
		],
	}),
	component: TransactionPage,
});

function TransactionPage() {
	const { error, parse, reset, transaction } = useTransaction();
	const [userInput, setUserInput] = useState("");

	function handlTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		reset();
		setUserInput(e.target.value);
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		parse(userInput);
	}

	return (
		<div className="space-y-16 w-full">
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="hex">Hex</label>
					<div>
						<textarea
							id="hex"
							name="hex"
							autoFocus
							spellCheck={false}
							className="mt-1 outline-0 ring-1 ring-border focus-visible:ring-ring rounded-xl p-2 w-full min-h-52"
							onChange={handlTextareaChange}
							value={userInput}
						/>
					</div>
				</div>
				<div
					className={cn(
						error ? "justify-between" : "justify-end",
						"mt-2 flex items-center",
					)}
				>
					{error && (
						<div className="inline-flex items-center gap-x-2  text-sm text-destructive">
							<Icon name="alert-triangle" /> <span>{error}</span>
						</div>
					)}
					<Button type="submit" size="sm">
						Submit
					</Button>
				</div>
			</form>
			{transaction && (
				<>
					<FieldList
						iconName="box"
						title="Header"
						fields={{
							ID: transaction.getId(),
							Version: transaction.version,
							Locktime: transaction.locktime,
						}}
					/>
					<Inputs inputs={transaction.ins} />
					<Outputs outputs={transaction.outs} />
					<FieldList
						iconName="sliders-horiz"
						title="Properties"
						fields={{
							"Virtual size": transaction.virtualSize(),
							Weight: transaction.weight(),
							Coinbase: transaction.isCoinbase() ? "Yes" : "No",
						}}
					/>
				</>
			)}
		</div>
	);
}
