import config from './environment';
import dynamo from 'dynamodb';

export default () => dynamo.AWS.config.update({accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey, region: config.region});
