import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Github, Gitlab, ExternalLink, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface Repository {
  id: string;
  _id: string;
  name: string;
  owner: string;
  fullName: string;
  url: string;
  provider: "github" | "gitlab";
  isActive: boolean;
  configuration: {
    autoReview: boolean;
  };
  stats: {
    totalReviews: number;
    lastActivity: string;
  };
}

interface RepositoryListProps {
  repositories: Repository[];
  onToggleRepository: (id: string) => void;
  onDeleteRepository: (id: string) => void;
}

export const RepositoryList = ({
  repositories,
  onToggleRepository,
  onDeleteRepository,
}: RepositoryListProps) => {
  if (repositories.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No repositories found
      </div>
    );
  }

  return (
    <>
      {repositories.map((repo) => (
        <div
          key={repo.id || repo._id}
          className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 hover:bg-muted/50 items-center"
        >
          <div className="col-span-3">
            <div>
              <div className="font-medium">{repo.name}</div>
              <div className="text-sm text-muted-foreground">{repo.owner}</div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="flex items-center gap-1.5">
              {repo.provider === "github" ? (
                <Github className="h-4 w-4" />
              ) : (
                <Gitlab className="h-4 w-4" />
              )}
              <span className="capitalize">{repo.provider || "GitHub"}</span>
            </div>
          </div>

          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <Switch
                checked={repo.isActive}
                onCheckedChange={() => onToggleRepository(repo.id || repo._id)}
              />
              {repo.isActive ? (
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-800 hover:bg-green-200"
                >
                  Active
                </Badge>
              ) : (
                <Badge variant="outline">Inactive</Badge>
              )}
            </div>
          </div>

          <div className="col-span-2 text-muted-foreground text-sm">
            {repo.stats?.lastActivity
              ? new Date(repo.stats.lastActivity).toLocaleDateString()
              : "Never synced"}
          </div>

          <div className="col-span-1">
            <Badge variant="outline" className="bg-primary/10">
              {repo.stats?.totalReviews || 0}
            </Badge>
          </div>

          <div className="col-span-1">
            <a
              href={repo.url || `https://github.com/${repo.owner}/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="col-span-1 text-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => onDeleteRepository(repo.id || repo._id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};
