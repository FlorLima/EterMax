class ValidationTitle{
    Validate(data){

        if(!data.title){
            return {error: "Title attribute is empty" ,  status: false};
        }
        return  {status: true};
    }
    
}

class ValidationAlbum{

    Validate(data){
        if(!data.album){
            return {error: "Album attribute is empty",  status: false};
        }
        return {status: true};
    }
}

class ValidationArtist{

    Validate(data){
        if(!data.artist){
            return {error:"Artist attribute is empty" ,  status: false};
        }
        return  {status: true};
    }

    

}

class ValidationList{

    Validate(data){
        if(!data.name){
            return {error:"List Name is empty" ,  status: false};
        }
        return  {status: true};
    }

    

}


module.exports = {
    ValidationArtist : ValidationArtist,
    ValidationAlbum : ValidationAlbum,
    ValidationTitle: ValidationTitle,
    ValidationList: ValidationList
  }