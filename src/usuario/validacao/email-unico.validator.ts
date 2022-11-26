import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { UsuarioRepository } from "../usuario.repository";
import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UsuarioEntity } from "../usuario.entity";

@Injectable()
@ValidatorConstraint({async: true})
export class EmailUnicoValidator implements ValidatorConstraintInterface{

  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async validate(value: string): Promise<boolean> {
    const possivelUsuario = await this.usuarioRepository.findAndCountBy({
      email: value,
    })
    return possivelUsuario.length > 0;
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