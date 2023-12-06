import { Injectable } from '@nestjs/common';
import { TrpcService } from '../app/trpc/trpc.service';
import { z } from 'zod';
import { WorksService } from './works.service';
import { SitesService } from '@server/sites/sites.service';
import { Work } from './works.entity';
import { TRPCError } from '@trpc/server';

@Injectable()
export class WorksRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly worksService: WorksService,
    private readonly sitesService: SitesService,
  ) {}

  worksRouter = this.trpc.router({
    get: this.trpc.authentificatedProcedure
      .input(z.object({
        site_ids: z.array(z.string()).optional()
      }))
      .query(async ({ ctx, input }) =>  {
        try {
          const { user } = ctx;
          const {
            site_ids,
          } = input;

          const getWorks = await this.worksService
            .getAllByOrganizationIdAndOptions(
              user.organizationId,
              {
                siteIds: site_ids,
              }
            )

          return getWorks;

        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      }),
    create: this.trpc.authentificatedProcedure
      .input(z.object({
        site_id: z.string(),
        name: z.string(),
      }))
      .mutation(async ({ ctx, input }) =>  {
        try {
          const { user } = ctx;
          const {
            site_id,
            name
          } = input;

          const siteAttachedToWork = await this.sitesService
            .getSiteById(site_id)

          if (siteAttachedToWork.organizationId !== user.organizationId) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "",
            });
          }

          const work = new Work();
          work.siteId = site_id;
          work.name = name;

          const workSaved = await this.worksService.createWork(work);

          return workSaved;

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

          const getWork = await this.worksService
            .getWorkWithSiteById(id)

          if (getWork.site.organizationId !== user.organizationId) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "",
            });
          }

          if (!!name) {
            getWork.name = name;
          }

          const workEdited = await this.worksService.editWork(getWork);

          return workEdited;

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
      }))
      .mutation(async ({ ctx, input }) =>  {
        try {
          const { user } = ctx;
          const {
            id,
          } = input;

          const getWork = await this.worksService
            .getWorkWithSiteById(id)

          if (getWork.site.organizationId !== user.organizationId) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "",
            });
          }

          const workDeleted = await this.worksService.deleteWorkById(id);

          return workDeleted;

        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      }),
  });
}

export type WorksRouterType = WorksRouter[`worksRouter`];