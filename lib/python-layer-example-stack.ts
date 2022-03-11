import {Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as lambda from '@aws-cdk/aws-lambda-python-alpha';
import {Runtime} from "aws-cdk-lib/aws-lambda";

export class PythonLayerExampleStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        // const layer = new lambda.PythonLayerVersion(this, 'PythonLayer', {
        //     entry: './assets/lambda_layers/root_layer',
        //     compatibleRuntimes: [Runtime.PYTHON_3_9]
        // });
        //
        const helloHandler = new lambda.PythonFunction(this, 'HelloHandler', {
            entry: './assets/lambda_handlers/hello',
            runtime: Runtime.PYTHON_3_9,
            layers: [
                new lambda.PythonLayerVersion(this, 'PythonLayer', {
                    entry: './assets/lambda_layers/root_layer',
                    compatibleRuntimes: [Runtime.PYTHON_3_9]
                })
            ]
        });


    }
}
