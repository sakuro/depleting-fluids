# frozen_string_literal: true

require "json"
require "rake/clean"

mod_license = "default_mit"
mod_category = "tweaks"
mod_tags = %w[Mining Fluids]

info = JSON.parse(File.read("info.json"))
mod_name = info["name"]
mod_version = info["version"]
dist_dir = "dist"
archive = "#{dist_dir}/#{mod_name}_#{mod_version}.zip"

CLOBBER.include(dist_dir)

desc "Build release zip"
task build: archive

archive_sources = %x[git archive --format=tar HEAD | tar -t -f -].lines(chomp: true)

directory dist_dir

file archive => [dist_dir, *archive_sources] do |t|
  prefix = File.basename(t.name, ".zip")
  sh "git archive --prefix #{prefix}/ HEAD -o #{t.name}"
end

desc "Install MOD locally"
task install: archive do |t|
  paths = JSON.parse(%x[bin/factorix path --json])
  cp t.prerequisites.first, paths["mod_dir"]
end

namespace :release do
  desc "Upload MOD to Factorio MOD Portal"
  task portal: archive do |t|
    abort "release tasks must be run from GitHub Actions" unless ENV["GITHUB_ACTIONS"]

    source_url = %x[git remote get-url origin].chomp

    sh("bin/factorix", "mod", "upload", t.prerequisites.first,
      "--category", mod_category,
      "--license", mod_license,
      "--source-url", source_url,
      "--description", File.read("README.md"))

    sh("bin/factorix", "mod", "edit", mod_name,
      "--summary", info["description"],
      "--tags", mod_tags.join(","))
  end

  desc "Create GitHub release"
  task github: archive do |t|
    abort "release tasks must be run from GitHub Actions" unless ENV["GITHUB_ACTIONS"]

    tag = "v#{mod_version}"
    sh "gh", "release", "create", tag,
      "--title", "#{mod_name} #{tag}",
      "--notes", changelog_notes(mod_version),
      t.prerequisites.first
  end
end

def changelog_notes(version)
  content = File.read("changelog.txt")
  match = content.match(/^Version: #{Regexp.escape(version)}\nDate: [^\n]+\n(.*?)(?=\n-{30,}|\z)/m)
  return "" unless match

  match[1].gsub(/^  /, "").strip
end
