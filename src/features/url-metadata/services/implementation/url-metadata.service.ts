import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AbstractUrlMetadataService } from '../abstract/abstract-url-metadata.service';
import * as cheerio from 'cheerio';
import { UrlMetadataType } from '../../types/url-metadata.type';
import * as url from 'node:url';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UrlMetadataService extends AbstractUrlMetadataService {
  constructor(private readonly httpService: HttpService) {
    super();
  }

  async getMetadata(targetUrl: string): Promise<UrlMetadataType> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(targetUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0' },
        }),
      );
      const $ = cheerio.load(data);

      return {
        title: $('title').first().text() || undefined,
        description: this.getMetaContent($, ['og:description', 'description']),
        favicon: this.getFavicon(targetUrl, $),
        image:
          this.getMetaContent($, ['og:image', 'twitter:image']) ||
          this.getFirstImage($),
        siteName:
          this.getMetaContent($, ['og:site_name']) ||
          this.getDomainName(targetUrl),
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch metadata',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  private getMetaContent($: cheerio.Root, names: string[]): string | undefined {
    for (const name of names) {
      const content = $(`meta[property='${name}'], meta[name='${name}']`).attr(
        'content',
      );
      if (content) return content;
    }
    return undefined;
  }

  private getFavicon(targetUrl: string, $: cheerio.Root): string {
    const faviconPath =
      $('link[rel="icon"]').attr('href') ||
      $('link[rel="shortcut icon"]').attr('href') ||
      '/favicon.ico';

    return url.resolve(targetUrl, faviconPath);
  }

  private getFirstImage($: cheerio.Root): string | undefined {
    const firstImage = $('img').first().attr('src');
    return firstImage ?? undefined;
  }

  private getDomainName(targetUrl: string): string | undefined {
    return new URL(targetUrl).hostname.replace('www.', '');
  }
}
