export interface AccoutDetail {
    accountId:            string;
    balance:              number;
    currentPage:          number;
    totalPages:           number;
    pageSize:             number;
    accountOperationDtos: AccountOperation[];
}

export interface AccountOperation {
    id:            number;
    operationDate: Date;
    amount:        number;
    type:          string;
    description:   null;
}