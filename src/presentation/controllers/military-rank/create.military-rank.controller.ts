import { CreateMilitaryRankService } from "@application/services";
import { MilitaryRankProps } from "@domain/entities";
import { CustomAppError } from "@domain/errors";
import { IController } from "@presentation/protocols/controller.interface";
import {
  IHttpRequest,
  IHttpResponse,
} from "@presentation/protocols/http.interface";

interface IConstructorProps {
  createMilitaryRankService: CreateMilitaryRankService;
}

export class CreateMilitaryRankController
  implements IController<MilitaryRankProps, null>
{
  constructor(private readonly props: IConstructorProps) {}

  public readonly handle = async (
    httpRequest: IHttpRequest<MilitaryRankProps>,
  ): Promise<IHttpResponse<null>> => {
    const { createMilitaryRankService } = this.props;

    try {
      if (!httpRequest.body.data) {
        throw new Error("Campos obrigatórios não foram preenchidos.");
      }

      const data: MilitaryRankProps = httpRequest.body.data;

      await createMilitaryRankService.create(data);

      return {
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof CustomAppError) {
        return {
          body: {
            error: error.message,
          },
          statusCode: error.statusCode,
        };
      }
      return {
        body: {
          error: "Erro interno do servidor.",
        },
        statusCode: 500,
      };
    }
  };
}
