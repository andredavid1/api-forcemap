import { CreateMilitaryRankService } from "@application/services";
import { MilitaryRankProps } from "@domain/entities";
import { CustomAppError } from "@domain/errors";
import { EmptyRequestBodyError } from "@presentation/errors";
import {
  HttpClientError,
  HttpServerError,
} from "@presentation/helpers/http.response";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "@presentation/protocols";

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
        throw new EmptyRequestBodyError();
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
        return HttpClientError(error);
      }
      return HttpServerError(error as Error);
    }
  };
}
