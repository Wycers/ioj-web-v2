import http from '@/utils/http';

export function getRanklist(id: number): Record<string, any> {
  return http.get(`/ranklist/${id}`);
}
