import { http, HttpResponse } from 'msw';
import { URLs } from '../../app/constants';
import { mockResponse } from './response';
import { mockRequest } from './request';

export const handlers = [
  http.get(URLs.people, ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    const page = url.searchParams.get('page');

    if (
      page &&
      +page === mockRequest.currentPage &&
      search === mockRequest.searchQuery
    ) {
      return HttpResponse.json(mockResponse);
    }

    return new HttpResponse(
      { hasError: true, message: 'Internal Server Error' },
      { status: 500 }
    );
  }),

  http.get(`${URLs.planets}:id/`, ({ request }) => {
    const url = new URL(request.url);
    const planetId = url.pathname.split('/').at(-2);

    if (planetId) {
      if (planetId === '1') {
        return HttpResponse.json({ name: 'Tatooine' });
      } else {
        return HttpResponse.json({ name: 'N/A' });
      }
    }
    return new HttpResponse(null, { status: 404 });
  }),

  http.get(`${URLs.image}:id.json`, ({ request }) => {
    const url = new URL(request.url);
    const lastElem = url.pathname.split('/').at(-1);
    const id = lastElem?.substring(0, lastElem.indexOf('.'));

    if (id) {
      if (id === mockResponse.results[0].id) {
        return HttpResponse.json({ image: mockResponse.results[0].imageURL });
      }
    }
    return new HttpResponse(null, { status: 404 });
  }),
];
