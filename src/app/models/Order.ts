import * as moment from "moment";

export interface IOrderDto {
    idOrder: number;
    idUser: number;
    name: string;
    orderNumber: number;
    dateTime: moment.Moment;
    providerName: string;
    dateCreated: moment.Moment;
    observation: string;
    totalValue: number;
    status: string;
}

export class OrderDto implements IOrderDto {
    idOrder!: number;
    idUser!: number;
    name!: string;
    orderNumber!: number;
    dateTime!: moment.Moment;
    providerName!: string;
    dateCreated!: moment.Moment;
    observation!: string;
    totalValue!: number;
    status!: string;

    constructor(data?: IOrderDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        } else {
            this.status = "-1";
        }
    }

    init(_data?: any) {
        if (_data) {
            this.idOrder = _data["IdOrder"];
            this.idUser = _data["IdUser"];
            this.name = _data["Name"];
            this.orderNumber = _data["OrderNumber"];
            this.dateTime = _data["DateTime"] ? moment.utc(_data["DateTime"]) : <any>undefined;
            this.providerName = _data["ProviderName"];
            this.dateCreated = _data["DateCreated"] ? moment.utc(_data["DateCreated"]) : <any>undefined;
            this.observation = _data["Observation"];
            this.totalValue = _data["TotalValue"];
            this.status = _data["Status"] ? _data["Status"] : "-1";
        }
    }

    static fromJS(data: any): OrderDto {
        data = typeof data === 'object' ? data : {};
        let result = new OrderDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["IdOrder"] = this.idOrder;
        data["OrderNumber"] = +this.orderNumber;
        data["DateTime"] = this.dateTime ? this.dateTime.toString() : <any>undefined;
        data["ProviderName"] = this.providerName;
        data["Observation"] = this.observation;
        data["TotalValue"] = this.totalValue;
        data["Status"] = this.status;

        return data;
    }
}