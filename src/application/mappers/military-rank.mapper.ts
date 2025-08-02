import { MilitaryRank, MilitaryRankProps } from "@domain/entities";
import {
  CreateMilitaryRankInputDTO,
  MilitaryRankOutputDTO,
} from "@application/dtos/military-rank";

export class MilitaryRankMapper {
  public static toEntity(dto: CreateMilitaryRankInputDTO): MilitaryRankProps {
    return {
      abbreviation: dto.abbreviation,
      order: dto.order,
    };
  }

  public static toOutputDTO(entity: MilitaryRank): MilitaryRankOutputDTO {
    return {
      id: entity.id,
      abbreviation: entity.abbreviation,
      order: entity.order,
      createdAt: entity.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: entity.updatedAt?.toISOString() || new Date().toISOString(),
    };
  }
}
