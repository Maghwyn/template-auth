import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';
import { getDomainUrl } from '@/common/helpers/string.helper';

@ValidatorConstraint()
class IsValidDomainConstraint implements ValidatorConstraintInterface {
	validate(url: string, _: ValidationArguments) {
		const allowedDomain = getDomainUrl();
		const allowedDomainRegex = new RegExp('^' + allowedDomain.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'));
		return allowedDomainRegex.test(url);
	}

	defaultMessage(_: ValidationArguments) {
		return 'The URL must belong to an allowed domain.';
	}
}

export function IsValidDomain(validationOptions?: ValidationOptions) {
	return (object: object, propertyName: string) => {
		registerDecorator({
			name: 'IsValidDomain',
			target: object.constructor,
			propertyName,
			options: validationOptions,
			validator: IsValidDomainConstraint
		});
	}
}