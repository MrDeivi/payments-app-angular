import { WritableSignal, signal } from "@angular/core";
import { Pagination, PaginationDto, PaymentRequest } from "src/app/store/types";

export type TableStateType = {
	elements: PaymentRequest[]
	paginationDto: PaginationDto
	pagination?: Pagination
}

const states = {}

export function getTableState(id): { state: WritableSignal<TableStateType>, updateState: (data: Partial<TableStateType>) => void } {
	if (states[id]) return states[id]

	const tableState = signal<TableStateType>(
		{ elements: [], paginationDto: { limit: 5, page: 1 } }
	)

	const updateState = (data: Partial<TableStateType>) => {
		tableState.set({ ...tableState(), ...data })
	}

	states[id] = { state: tableState, updateState }

	return { state: tableState, updateState }
}
