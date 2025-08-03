import { MilitaryRankMapper } from "@application/mappers";
import { MilitaryRank } from "@domain/entities";
import { CreateMilitaryRankInputDTO } from "@application/dtos/military-rank";

describe("MilitaryRankMapper", () => {
  describe("toEntity", () => {
    it("should convert CreateMilitaryRankInputDTO to MilitaryRankProps", () => {
      const inputDTO: CreateMilitaryRankInputDTO = {
        abbreviation: "Gen",
        order: 1,
      };

      const entityProps = MilitaryRankMapper.toEntity(inputDTO);

      expect(entityProps).toEqual({
        abbreviation: "Gen",
        order: 1,
      });
    });

    it("should handle DTO with different values", () => {
      const inputDTO: CreateMilitaryRankInputDTO = {
        abbreviation: "Sgt",
        order: 5,
      };

      const entityProps = MilitaryRankMapper.toEntity(inputDTO);

      expect(entityProps).toEqual({
        abbreviation: "Sgt",
        order: 5,
      });
    });

    it("should preserve all required properties from DTO", () => {
      const inputDTO: CreateMilitaryRankInputDTO = {
        abbreviation: "Maj",
        order: 3,
      };

      const entityProps = MilitaryRankMapper.toEntity(inputDTO);

      expect(entityProps).toHaveProperty("abbreviation");
      expect(entityProps).toHaveProperty("order");
      expect(entityProps.abbreviation).toBe("Maj");
      expect(entityProps.order).toBe(3);
    });
  });

  describe("toOutputDTO", () => {
    it("should convert MilitaryRank entity to MilitaryRankOutputDTO", () => {
      const mockDate = new Date("2025-08-03T10:30:00.000Z");
      const entity: MilitaryRank = {
        id: "test-id-123",
        abbreviation: "Col",
        order: 2,
        createdAt: mockDate,
        updatedAt: mockDate,
      };

      const outputDTO = MilitaryRankMapper.toOutputDTO(entity);

      expect(outputDTO).toEqual({
        id: "test-id-123",
        abbreviation: "Col",
        order: 2,
        createdAt: "2025-08-03T10:30:00.000Z",
        updatedAt: "2025-08-03T10:30:00.000Z",
      });
    });

    it("should handle entity without createdAt/updatedAt dates", () => {
      const entity: MilitaryRank = {
        id: "test-id-456",
        abbreviation: "Lt",
        order: 6,
        createdAt: undefined,
        updatedAt: undefined,
      };

      const outputDTO = MilitaryRankMapper.toOutputDTO(entity);

      expect(outputDTO.id).toBe("test-id-456");
      expect(outputDTO.abbreviation).toBe("Lt");
      expect(outputDTO.order).toBe(6);
      expect(outputDTO.createdAt).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      ); // ISO date format
      expect(outputDTO.updatedAt).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      ); // ISO date format
    });

    it("should handle entity with partial dates", () => {
      const mockCreatedDate = new Date("2025-07-01T08:00:00.000Z");
      const entity: MilitaryRank = {
        id: "test-id-789",
        abbreviation: "Cpt",
        order: 4,
        createdAt: mockCreatedDate,
        updatedAt: undefined, // Apenas updatedAt undefined
      };

      const outputDTO = MilitaryRankMapper.toOutputDTO(entity);

      expect(outputDTO.id).toBe("test-id-789");
      expect(outputDTO.abbreviation).toBe("Cpt");
      expect(outputDTO.order).toBe(4);
      expect(outputDTO.createdAt).toBe("2025-07-01T08:00:00.000Z");
      expect(outputDTO.updatedAt).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      ); // Nova data gerada
    });

    it("should preserve entity ID in output DTO", () => {
      const entity: MilitaryRank = {
        id: "custom-uuid-abc123",
        abbreviation: "Adm",
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const outputDTO = MilitaryRankMapper.toOutputDTO(entity);

      expect(outputDTO.id).toBe("custom-uuid-abc123");
      expect(typeof outputDTO.id).toBe("string");
      expect(outputDTO.id.length).toBeGreaterThan(0);
    });

    it("should convert dates to ISO string format", () => {
      const mockDate = new Date("2025-12-25T15:30:45.123Z");
      const entity: MilitaryRank = {
        id: "test-date-conversion",
        abbreviation: "Pvt",
        order: 8,
        createdAt: mockDate,
        updatedAt: mockDate,
      };

      const outputDTO = MilitaryRankMapper.toOutputDTO(entity);

      expect(outputDTO.createdAt).toBe("2025-12-25T15:30:45.123Z");
      expect(outputDTO.updatedAt).toBe("2025-12-25T15:30:45.123Z");
      expect(typeof outputDTO.createdAt).toBe("string");
      expect(typeof outputDTO.updatedAt).toBe("string");
    });

    it("should handle null createdAt/updatedAt as undefined", () => {
      const entity: MilitaryRank = {
        id: "test-null-dates",
        abbreviation: "WO",
        order: 7,
        // createdAt e updatedAt são opcionais, então podem ser undefined
      };

      const outputDTO = MilitaryRankMapper.toOutputDTO(entity);

      expect(outputDTO.id).toBe("test-null-dates");
      expect(outputDTO.abbreviation).toBe("WO");
      expect(outputDTO.order).toBe(7);
      // Quando undefined, o mapper usa new Date().toISOString()
      expect(typeof outputDTO.createdAt).toBe("string");
      expect(typeof outputDTO.updatedAt).toBe("string");
      expect(outputDTO.createdAt).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      );
      expect(outputDTO.updatedAt).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      );
    });
  });
});
