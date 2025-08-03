import { CreateMilitaryRankService } from "@application/services";
import { CreateMilitaryRankInputDTO } from "@application/dtos/military-rank";
import { MilitaryRankMapper } from "@application/mappers";
import { CustomAppError } from "@domain/errors";
import { EmptyRequestBodyError } from "@presentation/errors";
import { HttpClientError, HttpServerError } from "@presentation/helpers";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "@presentation/protocols";

interface IConstructorProps {
  createMilitaryRankService: CreateMilitaryRankService;
}

export class CreateMilitaryRankController
  implements IController<CreateMilitaryRankInputDTO, null>
{
  constructor(private readonly props: IConstructorProps) {}

  public readonly handle = async (
    httpRequest: IHttpRequest<CreateMilitaryRankInputDTO>,
  ): Promise<IHttpResponse<null>> => {
    const { createMilitaryRankService } = this.props;

    try {
      if (!httpRequest.body.data) {
        throw new EmptyRequestBodyError();
      }

      const inputDTO: CreateMilitaryRankInputDTO = httpRequest.body.data;
      const militaryRankProps = MilitaryRankMapper.toEntity(inputDTO);

      await createMilitaryRankService.create(militaryRankProps);

      const httpResponse: IHttpResponse<null> = {
        statusCode: 201,
      };

      return httpResponse;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof CustomAppError) {
        return HttpClientError(error);
      }
      return HttpServerError(error as Error);
    }
  };
}
