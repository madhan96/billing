export const setProReportList = (data) => {
    return ({ type: 'addProductReports', data: data });
}
export const setBillReportList = (data) => {
    return ({ type: 'addBillingReports', data: data });
}