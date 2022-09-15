const jwt = require('jsonwebtoken');

class UserService{
    constructor(secrectKey){
        this.secrectKey = secrectKey;
    }

    Authenticate(user, response){

        const token = jwt.sign({user},this.secrectKey);
        if(!token){
            return {token:token, errors: "Token is empty"} ;
        }
        return {token:token, errors: null} ;
    }

    Verify(token){
       try{
            const decoded = jwt.verify(token,this.secrectKey);
            return decoded;
       }catch(ex){
            console.log(ex)
       }
         
    }
}



function VerifyToken(req,res,next){
        //Auth header value = > send token into header
        console.log("inside of verifyToken")
        const bearerHeader = req.headers['authorization'];
        //check if bearer is undefined
        if(typeof bearerHeader !== 'undefined'){
    
            //split the space at the bearer
            const bearer = bearerHeader.split(' ');
            //Get token from string
            const bearerToken = bearer[1];
    
            //set the token
            req.token = bearerToken;
    
            //next middleweare
            next();
    
        }else{
            //Fobidden
            res.sendStatus(403);
        }
    
    }


module.exports = {
    verify: VerifyToken,
    userService: UserService
};

