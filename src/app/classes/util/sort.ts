export class Sort{
    constructor(){}

    sortOrder: number = -1;
    collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: 'base'
    });

    public sortData(colName: string, dataType: any = "", order: string){
        if(order === 'asc'){
            this.sortOrder = 1;
        }

        return (a: any, b: any) => {
            if(dataType == 'date'){
                return this.sortDate(new Date(a[colName]), new Date(b[colName]));
            }else{
                return this.collator.compare(a[colName], b[colName]) * this.sortOrder;
            }
        }
    }

    public sortDate(date1: Date, date2: Date){
        if(date1 > date2){
            return 1 * this.sortOrder;
        }else if(date1 < date2){
            return -1 * this.sortOrder;
        }else{
            return 0;
        }
    }
}