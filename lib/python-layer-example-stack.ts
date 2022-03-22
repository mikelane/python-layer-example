import {Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as apig from 'aws-cdk-lib/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda-python-alpha';
import {Runtime} from 'aws-cdk-lib/aws-lambda';

export class PythonLayerExampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const rootLayer = new lambda.PythonLayerVersion(this, 'PythonLayer', {
      entry: './assets/lambda_layers/root_layer',
      compatibleRuntimes: [Runtime.PYTHON_3_9],
    });

    const helloHandler = new lambda.PythonFunction(this, 'HelloHandler', {
      entry: './assets/lambda_handlers/hello',
      runtime: Runtime.PYTHON_3_9,
      layers: [rootLayer],
    });

    const api = new apig.RestApi(this, 'UkraineApi', {
      deployOptions: {
        stageName: 'dev',
      },
    });

    const v1 = api.root.addResource('v1');

    const ping = v1.addResource('hello');
    ping.addMethod('GET', new apig.LambdaIntegration(helloHandler));
  }
}
