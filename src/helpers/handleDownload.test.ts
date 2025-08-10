import { MOCK_BLOB } from '../test-utils/mocks/blob';
import { mockCard } from '../test-utils/mocks/cards';
import { handleDownload } from './handleDownload';

vi.stubGlobal('URL', {
  createObjectURL: vi.fn(() => 'blob:mock-url'),
  revokeObjectURL: vi.fn(),
});

describe('handleDownload', () => {
  const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL');

  async function readBlobAsText(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>): void => {
        const result = e.target?.result;

        if (typeof result === 'string') {
          resolve(result);
        } else {
          reject(new Error('FileReader result is not of type string'));
        }
      };

      reader.onerror = (): void => {
        reject(new Error('FileReader failed to read blob'));
      };

      reader.readAsText(blob);
    });
  }

  it('should create a Blob with the actual CSV content', async () => {
    handleDownload([mockCard[0], mockCard[1]]);

    expect(createObjectURLSpy).toHaveBeenCalledTimes(1);

    const blobArgument = createObjectURLSpy.mock.calls[0][0];

    expect(blobArgument).toBeInstanceOf(Blob);

    if (blobArgument instanceof Blob) {
      expect(blobArgument.type).toBe('text/csv');
      const csvContent = await readBlobAsText(blobArgument);
      expect(csvContent).toEqual(MOCK_BLOB);
    } else {
      throw new Error('blobArgument is not of type Blob');
    }
  });
});
