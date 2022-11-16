import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { UsuarioRepository } from "../usuario.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({async: true})
export class EmailUnicoValidator implements ValidatorConstraintInterface{

  constructor(private usuariorepository: UsuarioRepository) {}

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const usuarioComEmailExiste = await this.usuariorepository.existeComEmail(value)
    return !usuarioComEmailExiste;
  }
}

export const EmailUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (object: Object, propriedade: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: EmailUnicoValidator
    });
  }
}