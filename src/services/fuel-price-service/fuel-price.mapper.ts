import { IFuelPrice } from './types/fuel-price.type';

export class FuelPriceMapper {

    public static map(response: any): Array<IFuelPrice> {
        return response.map((fuelStation: any) => FuelPriceMapper.mapSingle(fuelStation));
    }

    public static mapSingle(fuelPriceRecord: any): IFuelPrice {
        return {
            identifier: fuelPriceRecord.Identifier,
            name: fuelPriceRecord.Name,
            address: fuelPriceRecord.Address,
            postcode: fuelPriceRecord.Postcode,
            provider: fuelPriceRecord.Provider,
            brand: fuelPriceRecord.Brand,
            latitude: fuelPriceRecord.Latitude,
            longitude: fuelPriceRecord.Longitude,
            petrol_e5_price: fuelPriceRecord.Petrol_E5_Price,
            petrol_e10_price: fuelPriceRecord.Petrol_E10_Price,
            diesel_b7_price: fuelPriceRecord.Diesel_B7_Price,
            updatedAt: fuelPriceRecord.UpdatedAt,
            createdAt: fuelPriceRecord.CreatedAt,
            distanceInMeters: fuelPriceRecord.DistanceInMeters,
            colour: this.generateColourFromBrand(fuelPriceRecord.Brand)
        };
    }

    public static generateColourFromBrand(brand: string) {

        brand = brand.toLowerCase().trim();

        if(brand === 'tesco') {
            return '#00539F';
        }

        if(brand === 'sainsbury\'s') {
            return '#F06C00';
        }

        if(brand === 'texaco') {
            return '#e93330';
        }

        if(brand === 'esso') {
            return '#a50e91';
        }

        if(brand === 'asda') {
            return '#78BE20';
        }

        if(brand === 'jet') {
            return '#f7c801';
        }

        if(brand === 'shell') {
            return '#FFD500';
        }

        if(brand === 'applegreen') {
            return '#6ebd00';
        }

        if(brand === 'applegreen') {
            return '#6ebd00';
        }

        if(brand === 'morrisons') {
            return '#00712f';
        }

        if(brand === 'bp') {
            return '#007f00';
        }

        return '#414141';
    };
}