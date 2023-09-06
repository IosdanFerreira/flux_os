export interface IWorkOrders {
    id: number;
    client_id: number;
    vehicle_id: number;
    employee_id: number;
    services_id: number[]
    init_date: string;
    init_time: string;
    end_date: string;
    end_time: string;
    payment_form_id: number;
    payment_situation_id: number;
    comments: string | null;
    user_id: number;
}