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
        throw new CustomAppError(
          "Campos obrigatórios não foram preenchidos.",
          422,
        );
      }

      const data: MilitaryRankProps = httpRequest.body.data;

      await createMilitaryRankService.create(data);

      const httpResponse: IHttpResponse<null> = {
        statusCode: 201,
      };

      return httpResponse;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof CustomAppError) {
        const httpResponse: IHttpResponse<null> = {
          body: { error: error.message },
          statusCode: error.statusCode,
        };
        return httpResponse;
      }
      const httpResponse: IHttpResponse<null> = {
        body: { error: "Erro interno do servidor." },
        statusCode: 500,
      };
      return httpResponse;
    }
  };
}
