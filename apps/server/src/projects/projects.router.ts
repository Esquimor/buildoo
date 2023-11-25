import { Injectable } from '@nestjs/common';
import { TrpcService } from '../app/trpc/trpc.service';
import { ProjectsService } from './projects.service';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

@Injectable()
export class ProjectsRouter {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly trpc: TrpcService
  ) {}

  projectRouter = this.trpc.router({
    getAll: this.trpc.authentificatedProcedure
      .query(async ({ ctx }) => {
        const { user } = ctx;

        try {
          const projects = await this.projectsService.findAllByOrganizationId(user.organization.id);
          return projects
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      }),
    getProjectWithContractors: this.trpc.authentificatedProcedure
      .input(
        z.object({
          id: z.string()
        })
      )
      .query(async ({ ctx, input }) => {
        const { user } = ctx;
        const { id } = input;

        try {
          const projectFull = await this.projectsService.findOneWithContractors(id, user.organization.id);
          return projectFull
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
        });
      }
    }),
    create: this.trpc.authentificatedProcedure
      .input(
        z.object({
          name: z.string(),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const { name } = input;
        const { user } = ctx;

        try {
          const projects = await this.projectsService.createAProject({
            name,
            organizationId: user.organization.id
          });
          return projects
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      }),
  });
}

export type ProjectsRouterType = ProjectsRouter[`projectRouter`];