export interface IWorkOrders {
    date: string;
    client_id: number;
    vehicle_id: number;
    employee_id: number;
    services: number[];
    payment_form_id: number;
    init_date: string;
    init_time: string;
    end_date: string;
    end_time: string;
    payment_situation_id: number;
    comments: string | null;
    user_id: number;
}