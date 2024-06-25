
export interface productProps{
    id:number;
    title:string;
    description:string;
    category:string;
    rating:string;
    
    meta:{
        createdAt:string;
        updatedAt:string;
    }
    reviews:{
        rating:number;
        date:string;
        comment:string;
    }[];
    onRowClick?:(product:Partial<productProps>)=>void;
   
}
