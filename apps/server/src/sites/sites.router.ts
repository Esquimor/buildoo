import { Injectable } from '@nestjs/common';
import { TrpcService } from '../app/trpc/trpc.service';
import { TRPCError } from '@trpc/server';
import { SitesService } from './sites.service';
import { z } from 'zod';
import { Site } from './sites.entity';

@Injectable()
export class SitesRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly sitesService: SitesService,
  ) {}

  sitesRouter = this.trpc.router({
    get: this.trpc.authentificatedProcedure
      .query(async ({ ctx }) =>  {
        try {
          const { user } = ctx;

          const getSitesFromOrganization = await this.sitesService.getAllByOrganizationId(user.organizationId)

          return getSitesFromOrganization;

        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      }),
    create: this.trpc.authentificatedProcedure
      .input(z.object({
        name: z.string(),
      }))
      .mutation(async ({ ctx, input }) =>  {
        try {
          const { user } = ctx;
          const {
            name
          } = input;

          const site = new Site();
          site.name = name;
          site.organizationId = user.organizationId;

          const siteCreated = await this.sitesService.createSite(site)

          return siteCreated;

        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      }),
    edit: this.trpc.authentificatedProcedure
      .input(z.object({
        id: z.string(),
        name: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) =>  {
        try {
          const { user } = ctx;
          const {
            id,
            name
          } = input;

          const getSite = await this.sitesService.getSiteById(id);

          if (getSite.organizationId !== user.organizationId) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "",
            });
          }

          if (!!name) {
            getSite.name = name
          }

          const siteEdited = await this.sitesService.editSite(getSite)

          return siteEdited;

        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      }),
    delete: this.trpc.authentificatedProcedure
      .input(z.object({
        id: z.string(),
        name: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) =>  {
        try {
          const { user } = ctx;
          const {
            id,
          } = input;

          const getSite = await this.sitesService.getSiteById(id);

          if (getSite.organizationId !== user.organizationId) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "",
            });
          }

          const siteDeleted = await this.sitesService.deleteSiteById(id)

          return siteDeleted;

        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      }),
  });
}

export type SitesRouterType = SitesRouter[`sitesRouter`];