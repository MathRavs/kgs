import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AbstractUrlMetadataService } from '../abstract/abstract-url-metadata.service';
import * as cheerio from 'cheerio';
import { UrlMetadataType } from '../../types/url-metadata.type';
import * as url from 'node:url';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UrlMetadataService extends AbstractUrlMetadataService {
  @Inject()
  private readonly httpService: HttpService;

  @Inject()
  private readonly logger: Logger;

  async getMetadata(targetUrl: string): Promise<UrlMetadataType> {
    try {
      this.logger.debug(`Fetching metadata`, this.constructor.name);

      const { data } = await firstValueFrom(
        this.httpService.get(targetUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0' },
        }),
      );

      this.logger.debug(`HTML page retrieved`, this.constructor.name);

      const $ = cheerio.load(data);

      this.logger.debug(`data loaded in scraper`, this.constructor.name);

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
      if (content) {
        this.logger.debug(`meta content found`, this.constructor.name);
        return content;
      }
    }

    this.logger.debug(`meta contend not found`, this.constructor.name);
    return undefined;
  }

  private getFavicon(targetUrl: string, $: cheerio.Root): string {
    const faviconPath =
      $('link[rel="icon"]').attr('href') ||
      $('link[rel="shortcut icon"]').attr('href') ||
      '/favicon.ico';

    try {
      const result = url.resolve(targetUrl, faviconPath);
      this.logger.debug(`favicon found`, this.constructor.name);

      return result;
    } catch {
      this.logger.debug(`favicon not found`, this.constructor.name);
    }
  }

  private getFirstImage($: cheerio.Root): string | undefined {
    const firstImage = $('img').first().attr('src');
    return firstImage ?? undefined;
  }

  private getDomainName(targetUrl: string): string | undefined {
    return new URL(targetUrl).hostname.replace('www.', '');
  }
}
