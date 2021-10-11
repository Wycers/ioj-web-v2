import http from '@/utils/http';

export function getBlueprints(): Record<string, any> {
  return http.get('/blueprint');
}

export function getBlueprint(id: string): Record<string, any> {
  return http.get(`/blueprint/${id}`);
}
