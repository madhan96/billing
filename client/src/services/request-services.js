import { getProducts, userService, productReportService, billReportService } from './service-calls'
import { setProductsList } from '../actions/productdata';
import { setUsersList } from '../actions/userdata';
import { setProReportList, setBillReportList } from '../actions/reportsdata';


export const getProd = () => {
    return (dispatch) => {
        getProducts((response) => {
            dispatch(setProductsList(response.data));
        }
        );
    }
}

export const getUsers = () => {
    return (dispatch) => {
        userService((res) => {
            dispatch(setUsersList(res.users));
        });
    }
}

export const getProReport = (data) => {
    return (dispatch) => {
        productReportService(data, (res) => {
            dispatch(setProReportList(res.report));
        });
    }
}

export const getBillReport = (data) => {
    return (dispatch) => {
        billReportService(data, (res) => {
            dispatch(setBillReportList(res.report));
        });
    }
}
