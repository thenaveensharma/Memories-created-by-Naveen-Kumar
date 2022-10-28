import Jwt  from "jsonwebtoken";

const auth =async(req,res,next)=>{

    try {
        console.log('Testing token')
        const token=req.headers.authorization.split(' ')[1];
        console.log(token);
        const isCustomAuth=token.includes('.com');
        console.log(isCustomAuth);
        if(token && !isCustomAuth){
            console.log('testing the token using jwt')
            let decodedData=Jwt.verify(token,'test');
            console.log(decodedData)
            req.userId=decodedData?.id;
        }
        else{
            console.log('auth google user')
            req.userId=token;
        }

        console.log('Auth verified')
        next();
    } catch (error) {
        console.log(error);
    }
}
export default auth;