import Employee from '../../../resources/model_employee_deprecated.js';
import logger from '../log/logger.js';

class ModelsGenerator {
    async modelsGenerator(dataSet, totalCount) {
        if (totalCount !== 1) {
            logger.log('    ▶ get data from table')
        }

        let counter = 0;
        const employeesList = [];
        while (counter < totalCount) {
            const employee = new Employee();
            employee.firstName = dataSet[counter][0];
            employee.lastName = dataSet[counter][1];
            employee.age = dataSet[counter][2];
            employee.email = dataSet[counter][3];
            employee.salary = dataSet[counter][4];
            employee.department = dataSet[counter][5];
            employeesList.push(employee);
            counter += 1;
        }

        return employeesList.map(element => JSON.stringify(element));
    }
}

export default new ModelsGenerator();