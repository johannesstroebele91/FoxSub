export class Service {
    constructor(private _idService: number, private _name: string, private _imageURL: string, private _category: string) {
    }

    get idService(): number {
        return this._idService;
    }

    set idService(value: number) {
        this._idService = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get imageURL(): string {
        return this._imageURL;
    }

    set imageURL(value: string) {
        this._imageURL = value;
    }

    get category(): string {
        return this._category;
    }

    set category(value: string) {
        this._category = value;
    }
}
