declare global{
    namespace Express {
        interface Response{
            success :<T>(data :T,message?:string)=>void;
        }

        interface Request {
            user?:{
                id:string,
                email:string
            }
        }
    }
}


export{}