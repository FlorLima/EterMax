class Validator{

    constructor(validations){
        this.validations = validations;
    }

    RunValidations(data){
        let overallResult = "";
        for (const index in this.validations) {
            let result = this.validations[index].Validate(data);
            if(!result.status){
                overallResult += result.error;
            }
        }
        return overallResult;
    }
}

module.exports = Validator;