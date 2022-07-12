export interface IProductDto {
    idOrdersProducts: number;
    idOrder: number;
    valueUnit: number;
    unit: number;
    description: string;
    sku: string;
    quantity: number;
    qtyBox: number;
    weight: number;
    volumen: number;
    mark: string;
    status: string;

}

export class ProductDto implements IProductDto {
    idOrdersProducts!: number;
    idOrder!: number;
    valueUnit!: number;
    unit!: number;
    description!: string;
    sku!: string;
    quantity!: number;
    qtyBox!: number;
    weight!: number;
    volumen!: number;
    mark!: string;
    status!: string;

    constructor(data?: IProductDto) {
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
            this.idOrdersProducts = _data["IdOrdersProducts"];
            this.idOrder = _data["IdOrder"];
            this.valueUnit = _data["ValueUnit"];
            this.unit = _data["Unit"];
            this.description = _data["Description"];
            this.sku = _data["SKU"];
            this.quantity = _data["Quantity"];
            this.qtyBox = _data["QtyBox"];
            this.weight = _data["Weight"];
            this.volumen = _data["Volumen"];
            this.mark = _data["Mark"];
            this.status = _data["Status"] ? _data["Status"] : "-1";
        }
    }

    static fromJS(data: any): ProductDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProductDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["IdOrdersProducts"] = this.idOrdersProducts;
        data["IdOrder"] = this.idOrder;
        data["ValueUnit"] = this.valueUnit;
        data["Unit"] = this.unit;
        data["Description"] = this.description;
        data["SKU"] = this.sku;
        data["Quantity"] = this.quantity;
        data["QtyBox"] = this.qtyBox;
        data["Weight"] = this.weight;
        data["Volumen"] = this.volumen;
        data["Mark"] = this.mark;
        data["Status"] = this.status;
        return data;
    }
}