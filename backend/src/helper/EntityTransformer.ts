/**
 * E: Original Entity type, T: Transformed Entity Type
 */
class EntityTransformer<E, T> {
  constructor(private readonly transformmedEntityClass: new (__data: E) => T) {}

  public fromEntities(__entities: E[]) {
    return __entities.map((__entity: E) => {
      return this.fromEntity(__entity);
    });
  }
  public fromEntity(__entity: E) {
    const transformmedEntity = new this.transformmedEntityClass(__entity);
    return transformmedEntity;
  }
}

export default EntityTransformer;
