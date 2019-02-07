import Compat from '../src/compat';

jest.setTimeout(60000);

describe('Compat', () => {
  it('should write compat records to each api record', async () => {
    const [record, ...records] = await Compat();
    expect(record).toHaveProperty('apiType');
    expect(record).toHaveProperty('type');
    expect(record).toHaveProperty('protoChain');
    expect(record).toHaveProperty('protoChainId');
    expect(record).toHaveProperty('astNodeType');
    expect(record).toHaveProperty('isStatic');
    expect(record).toMatchSnapshot();

    records.forEach(_record => {
      expect(_record).toHaveProperty('apiType');
      expect(_record).toHaveProperty('type');
      expect(_record).toHaveProperty('protoChain');
      expect(_record).toHaveProperty('protoChainId');
      expect(_record).toHaveProperty('astNodeType');
      expect(_record).toHaveProperty('isStatic');
      expect(_record).toHaveProperty('compat');
      // Test the properties of non-deprecated APIs
      if (_record.compat.status && !_record.compat.status.deprecated) {
        expect(_record).toHaveProperty('compat.support');
        expect(_record).toHaveProperty('compat.status');
      }
    });
  });
});